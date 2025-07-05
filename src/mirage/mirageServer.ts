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
      server.create('contact', { id: '3', name: 'Charlie', email: 'charlie@example.com', phone: '555-111-2222' });
      server.create('contact', { id: '4', name: 'Diana', email: 'diana@example.com', phone: '555-333-4444' });
      server.create('contact', { id: '5', name: 'Eve', email: 'eve@example.com', phone: '555-555-5555' });
      server.create('contact', { id: '6', name: 'Frank', email: 'frank@example.com', phone: '555-666-7777' });
      server.create('contact', { id: '7', name: 'Grace', email: 'grace@example.com', phone: '555-888-9999' });
      server.create('contact', { id: '8', name: 'Hank', email: 'hank@example.com', phone: '555-000-1111' });
      server.create('contact', { id: '9', name: 'Ivy', email: 'ivy@example.com', phone: '555-222-3333' });
      server.create('contact', { id: '10', name: 'Jack', email: 'jack@example.com', phone: '555-444-5555' });
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

      // Passthrough cho các route Next.js và các route không phải API Mirage
      this.passthrough('/_next/*');
      this.passthrough('/appointment/*');
      this.passthrough('/api/auth/*');
      this.passthrough((request) => {
        // Cho phép tất cả request không phải API của Mirage
        return !request.url.includes('/api/contacts') && !request.url.includes('/api/vehicles');
      });
    },
  });
}
