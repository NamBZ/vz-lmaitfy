# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when a new release is published.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Create a Release

1. Go to your repository on GitHub
2. Click on **Releases** (or navigate to `/releases`)
3. Click **Create a new release**
4. Choose a tag version (e.g., `v1.0.0`)
5. Add release title and description
6. Click **Publish release**

### 3. Monitor Deployment

- After publishing a release, the GitHub Action will automatically trigger
- You can monitor the deployment progress in the **Actions** tab
- Once completed, your site will be available at: `https://<username>.github.io/<repository-name>`

For this repository: `https://NamBZ.github.io/vz-lmaitfy`

## Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Choose the branch (usually `main`)
5. Click **Run workflow**

## Local Testing

To test the static export locally:

```bash
npm run build
npx serve out
```

## Configuration Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.ts` - Next.js configuration for static export
- `public/.nojekyll` - Prevents Jekyll processing on GitHub Pages

## Troubleshooting

### Build Fails
- Check that all dependencies are correctly listed in `package.json`
- Ensure no dynamic features that don't work with static export are used

### 404 Errors
- Make sure `trailingSlash: true` is set in `next.config.ts`
- Check that all links use relative paths

### Images Not Loading
- Ensure `images.unoptimized: true` is set in `next.config.ts`
- Use regular `<img>` tags instead of Next.js `Image` component for static assets