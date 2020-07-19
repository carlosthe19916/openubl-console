echo "Creating organizations"

for i in $(seq 1 25);
do
    JSON_STRING=$( jq -n \
                  --arg org_name "organization$i" \
                  '{
                        "name":$org_name,
                        "useCustomCertificates":true,
                        "settings":{
                            "ruc":"12345678912",
                            "razonSocial":"razonSocial",
                            "nombreComercial":"nombreComercial",
                            "sunatUsername":"username",
                            "sunatPassword":"password",
                            "sunatUrlFactura":"https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService",
                            "sunatUrlGuiaRemision":"https://e-beta.sunat.gob.pe/ol-ti-itemision-guia-gem-beta/billService",
                            "sunatUrlPercepcionRetencion":"https://e-beta.sunat.gob.pe/ol-ti-itemision-otroscpe-gem-beta/billService"
                        }
                    }' )
            
    curl -v -X POST \
    -H "Content-Type: application/json" \
    -d "$JSON_STRING" \
    http://localhost:8080/api/organizations;
done

echo "Organizations created"