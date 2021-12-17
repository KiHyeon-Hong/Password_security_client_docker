## Installation

### git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_client_docker.git
```

### Docker images

```bash
docker build . -t passwordsecurityclient
docker run -p 65001:65001 -d passwordsecurityclient

docker exec -it <container ID> /bin/bash
```
