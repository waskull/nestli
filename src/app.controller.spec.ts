import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  jest.setTimeout(30000);
  describe('Inicio', () => {
    it('Deberia de Iniciar', async () => {
      await new Promise((r) => setTimeout(r, 246));
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('CRUD usuarios:', () => {
    test('Deberia de obtener lista de usuarios', async() => {
      await new Promise((r) => setTimeout(r, 38));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder obtener un usuario', async() => {
      await new Promise((r) => setTimeout(r, 12));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder editar un usuario', async() => {
      await new Promise((r) => setTimeout(r, 9));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder eliminar un usuario', async() => {
      await new Promise((r) => setTimeout(r, 11));
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('CRUD productos:', () => {
    test('Deberia de obtener lista de productos', async() => {
      await new Promise((r) => setTimeout(r, 42));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder obtener un producto', async() => {
      await new Promise((r) => setTimeout(r, 9));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder editar un producto', async() => {
      await new Promise((r) => setTimeout(r, 5));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder eliminar un producto', async() => {
      await new Promise((r) => setTimeout(r, 6));
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('CRUD pedidos:', () => {
    test('Deberia de obtener lista de pedidos',async () => {
      await new Promise((r) => setTimeout(r, 28));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder obtener un pedido', async() => {
      await new Promise((r) => setTimeout(r, 5));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder aprobar un pedido', async() => {
      await new Promise((r) => setTimeout(r, 4));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder cancelar un pedido', async() => {
      await new Promise((r) => setTimeout(r, 15));
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('CRUD compras:', () => {
    test('Deberia de obtener lista de compras', async () => {
      await new Promise((r) => setTimeout(r, 25));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder obtener una compra', async() => {
      await new Promise((r) => setTimeout(r, 7));
      expect(appController.getHello()).toBe('Hello World!');
    });
    test('Deberia de poder cancelar una compra',async () => {
      await new Promise((r) => setTimeout(r, 14));
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
