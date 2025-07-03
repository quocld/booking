import { createServer, Model } from 'miragejs';

export function makeMirageServer() {
  return createServer({
    models: {
      contact: Model,
      vehicle: Model,
    },
    seeds(server) {
      server.create('contact', { id: '1', name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' });
      server.create('contact', { id: '2', name: 'Bob', email: 'bob@example.com', phone: '987-654-3210' });
      server.create('vehicle', { id: '1', make: 'Toyota', model: 'Camry', type: 'Sedan' });
      server.create('vehicle', { id: '2', make: 'Honda', model: 'Civic', type: 'Sedan' });
      server.create('vehicle', { id: '3', make: 'Ford', model: 'F-150', type: 'Truck' });
    },
    routes() {
      this.namespace = 'api';
      this.get('/contacts', (schema) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (schema as any).contacts.all().models;
      });
      this.post('/contacts', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const contact = (schema as any).contacts.create(attrs);
        return contact.attrs;
      });
      this.get('/vehicles', (schema) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (schema as any).vehicles.all().models;
      });
    },
  });
} 