🚀 Kubernetes Hands-on Project: Deploying NGINX & Apache Using a Single deployment.yml on Google Cloud Platform

I recently completed a practical lab where I created a Kubernetes cluster on GCP, connected it to my laptop, deployed two applications using a single deployment file, and exposed them using ClusterIP, NodePort, and LoadBalancer Services.

This exercise helped me understand real-world Kubernetes deployment and networking concepts.

---

🔹 Step 1: Created Kubernetes Cluster on GCP

```bash
gcloud container clusters create my-cluster --zone us-central1-a
gcloud container clusters get-credentials my-cluster --zone us-central1-a
kubectl get nodes
```

✔ Cluster created and connected successfully to my local machine.

---

🔹 Step 2: Created a Single deployment.yml (Contains Two Deployments)

I used one YAML file to deploy:
• One Pod running NGINX
• One Pod running Apache (httpd)

```bash
vi deployment.yml
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-app
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx-container
        image: nginx:latest
        ports:
        - containerPort: 80

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apache-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: apache-app
  template:
    metadata:
      labels:
        app: apache-app
    spec:
      containers:
      - name: apache-container
        image: httpd:latest
        ports:
        - containerPort: 80
        command: ["httpd-foreground"]
```

Applied the deployment:

```bash
kubectl apply -f deployment.yml
```

Verified Pods:

```bash
kubectl get pods -o wide
```

✔ Both NGINX and Apache Pods were running successfully.

---

🔹 Step 3: Created Services to Expose the Applications

```bash
vi service.yml
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: ClusterIP
  selector:
    app: nginx-app
  ports:
  - port: 80
    targetPort: 80

---
apiVersion: v1
kind: Service
metadata:
  name: apache-service
spec:
  type: ClusterIP
  selector:
    app: apache-app
  ports:
  - port: 80
    targetPort: 80
```

```bash
kubectl apply -f service.yml
kubectl get svc
```

✔ ClusterIP verified internal communication between Services and Pods.

---

🔹 Step 4: Tested NodePort Service (External Access)

Edited service type:

```bash
kubectl edit svc nginx-service
kubectl edit svc apache-service
```

Changed to:

```
type: NodePort
```

Accessed applications using:

```
http://<NodeIP>:30080
http://<NodeIP>:30081
```

✔ Successfully accessed apps externally via NodePort.

---

🔹 Step 5: Converted to LoadBalancer (Cloud Integration)

```bash
kubectl edit svc nginx-service
```

Changed to:

```
type: LoadBalancer
```

Checked External IP:

```bash
kubectl get svc -w
```

✔ GCP automatically provisioned external IP and load balancer.

Accessed application:

```
http://<EXTERNAL-IP>
```

---

📊 Key Learnings from This Hands-on:

✅ Single YAML can manage multiple Deployments efficiently
✅ Deployments provide self-healing and scalability
✅ Services dynamically connect to Pods using labels
✅ ClusterIP enables internal communication
✅ NodePort allows external testing via node IP
✅ LoadBalancer integrates Kubernetes with cloud networking
✅ GCP handles infrastructure while Kubernetes manages orchestration