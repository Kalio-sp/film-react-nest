jest.mock('./order.service', () => {
  return {
    OrderService: jest.fn().mockImplementation(() => ({
      createOrder: jest.fn(),
      getOrders: jest.fn(),
    })),
  };
});

import { Test, TestingModule } from '@nestjs/testing';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
            getOrders: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    const dto = {
      email: 'test@mail.com',
      phone: '+79999999999',
      tickets: [],
    };

    const result = {
      total: 0,
      items: [],
    };

    jest.spyOn(service, 'createOrder').mockResolvedValue(result);

    expect(await controller.createOrder(dto)).toEqual(result);

    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });

  it('should get orders', async () => {
    const result = [];

    jest.spyOn(service, 'getOrders').mockResolvedValue(result);

    expect(await controller.getOrders('test@mail.com')).toEqual(result);

    expect(service.getOrders).toHaveBeenCalledWith('test@mail.com');
  });
});
