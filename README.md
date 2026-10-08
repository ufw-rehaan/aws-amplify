# AWS Amplify Wildcard Subdomain Test

This is a completely isolated Next.js application designed **exclusively** for testing AWS Amplify Hosting's support for arbitrary wildcard subdomains.

## Local Development Instructions

To test the application locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser. 
   The application will handle the `localhost` hostname gracefully.

## AWS Amplify Deployment Instructions

### 1. Push to GitHub
1. Initialize a Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub.
3. Add the remote and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### 2. Connect to AWS Amplify
1. Go to the AWS Amplify Console.
2. Click **Host web app** and connect your GitHub repository.
3. Select the `main` branch.
4. Amplify will automatically detect the Next.js app and the `amplify.yml` build settings.
5. Review and click **Save and deploy**.

### 3. Configure the Custom Domain
Once the app is deployed on the default `amplifyapp.com` domain, attach your custom domain:
1. In the Amplify Console, go to **Domain management** (under App settings).
2. Click **Add domain**.
3. Enter your domain: `billme.shop`.
4. Click **Configure domain**.
5. Set up the root domain and `www` subdomain as usual (or exclude them if you strictly want subdomains).
6. Click **Save and deploy**.

### 4. Configure the Wildcard Subdomain
To route all subdomains to this Next.js app:
1. In **Domain management**, click **Manage subdomains** (or edit the domain).
2. Add a new subdomain.
3. For the subdomain prefix, enter `*` (an asterisk).
4. Point it to the `main` branch.
5. Save the configuration.

### 5. DNS Instructions for `billme.shop`
Amplify will provide DNS records that you must add to your DNS provider (e.g., Route 53, Cloudflare, GoDaddy):
1. **CNAME / ALIAS Record**: You will need to create a CNAME record for `*.billme.shop` pointing to the provided CloudFront distribution (e.g., `d123456.amplifyapp.com`).
2. **SSL Verification**: Amplify uses AWS Certificate Manager (ACM) to generate a free SSL certificate. It will require you to add a specific `CNAME` record to prove you own the domain. **Make sure to add this validation record**, otherwise the deployment will hang at the SSL configuration step.

### 6. Verify SSL / HTTPS
- After adding the DNS validation record, wait for Amplify to issue the certificate. This can take up to 30 minutes.
- Once issued, Amplify will automatically provision the CloudFront distribution and make your site live over HTTPS.

### 7. Final Testing Checklist
After the domain is fully propagated and active, perform the following tests:
- [ ] Visit `https://test.billme.shop` -> Should show Tenant: `test`
- [ ] Visit `https://client1.billme.shop` -> Should show Tenant: `client1`
- [ ] Visit `https://abc.billme.shop` -> Should show Tenant: `abc`
- [ ] Verify that all variations load the exact same application layout and design.
- [ ] Check the "Server Information" panel to ensure headers like `x-forwarded-host` and `x-forwarded-for` are populated correctly by the AWS Amplify infrastructure.

---
**Note:** This is purely a frontend infrastructure test and contains no backend, authentication, or database logic.
