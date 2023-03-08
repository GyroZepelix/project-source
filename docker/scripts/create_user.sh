cd /opt/keycloak/bin/
# login with admin user to enable realm management
./kcadm.sh config credentials --server http://localhost:8080 --realm master --user ${KEYCLOAK_ADMIN} --password ${KEYCLOAK_ADMIN_PASSWORD}

# create realm 'project-source'
./kcadm.sh create realms -s realm=project-source -s enabled=true
# create role 'user'
./kcadm.sh create roles -r project-source -s name=user
# create user 'domagoj.gjalic@og-cs.com', add role 'user' and set password '12345678'
./kcadm.sh create users -r project-source -s username=domagoj.gjalic -s email=domagoj.gjalic05@og-cs.com -s enabled=true
./kcadm.sh add-roles -r project-source --uusername domagoj.gjalic --rolename user
./kcadm.sh set-password -r project-source --username domagoj.gjalic -p 12345678
