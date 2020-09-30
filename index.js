const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const fs = require('fs');
const path = require('path');

let instanceNumber = 7;

let size = "t2.micro";     // t2.micro is available in the AWS free tier

let group = new aws.ec2.SecurityGroup("cloudera-secgrp", {
    ingress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
});

// NOTE: you need to use "ssh-keygen -m pem" to generate local key pair first.
// then register local key pair as AWS keypair
const publicKey = fs.readFileSync(path.join(process.env.HOME, ".ssh/id_rsa.pub"), "UTF-8")
const deployer = new aws.ec2.KeyPair("cloudera-deployer", {
    publicKey: publicKey,
});


let serverList = [...Array(instanceNumber).keys()].map(i => {
    return new aws.ec2.Instance(`cloudera-server-${i+1}`, {
        instanceType: size,
        vpcSecurityGroupIds: [ group.id ], // reference the security group resource above
        ami: "ami-02b6d9703a69265e9",  // RHRL8 AMI from Amazon
        keyName: deployer.keyName,
        tags: {'role': 'cloudera server'}
    });
})

// TODO: build ansible inventory from server list
exports.publicIps = serverList.map(s => s.publicIp);
exports.publicHostNames = serverList.map(s => s.publicDns);
