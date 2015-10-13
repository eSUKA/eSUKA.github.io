cd ../output
rmdir /s /q .git
@echo www.esuka.de> CNAME
git init
git remote add origin git@github.com:eSUKA/esuka.github.io.git
git add .
git commit -m "Pages recompiled"
git push origin HEAD:master --force
cd ../nrauschcom.github.io