# pulumi-try
A try to deploy cloudera on AWS using pulumi

## Preparation

Needs an AWS account. Free tier shall work for this trial purpose.

* Create an IAM user for the trial with "AmazonEC2FullAccess" policy. 
* Download AWS CLI and configure it with the secret API key of the above user.
* Verify AWS CLI works properly.

## Development setup
### Install pulumi

https://www.pulumi.com/docs/get-started/aws/begin/

Pulumi will use AWS CLI configuration to access AWS.

### Install nodeJS

https://nodejs.org/en/

### Generate local key pair

```bash
ssh-keygen -m pem
```

## Run

```bash
git clone https://github.com/pylake/pulumi-try.git
cd pulumi-try
npm install
# you will be asked to create a pulumi account here in browser.
# just follow its instructions
pulumi up
```

If everything goes right, you will see a list of IPs and DNS names of the started instances. Wait a while for them to fully started so that SSH is accessible.

Try log into an instance:

```bash
ssh ec2-user@<ip or dns>
```

## Clean up AWS resources

Remember to clean up AWS resources to avoid unexpected cost.

```bash
pulumi destroy
```

## TODO

- Build Ansible inventory from the output IP list (maybe dynamic inventory?)
- Run cloudera playbook https://github.com/cloudera/cloudera-playbook

