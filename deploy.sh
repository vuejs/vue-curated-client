rm -rf .deploy
mkdir .deploy
npm run build
mv dist .deploy/
cp index.html .deploy/
cp CNAME .deploy/
cd .deploy
git init
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:vuejs/vue-curated-client.git master:gh-pages
