cd /opt/keycloak/bin/
# login with admin user to enable realm management
./kcadm.sh config credentials --server http://localhost:8080 --realm master --user ${KEYCLOAK_ADMIN} --password ${KEYCLOAK_ADMIN_PASSWORD}
# create clients for frontend and backend
./kcadm.sh create clients -r project-source -s clientId=frontend -s "redirectUris=[\"http://localhost:5173/*\"]" -s "webOrigins=[\"*\"]" -s "baseUrl=\"http://localhost:5173/\"" -s "rootUrl=\"http://localhost:5173/\""
./kcadm.sh create clients -r project-source -s clientId=backend -s "directAccessGrantsEnabled=true"