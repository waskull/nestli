import { RolesBuilder } from 'nest-access-control';

export enum AppRoles{
    MANAGER = 'gerente',
    ADMIN = 'admin',
    SALESMAN = 'vendedor',
    CLIENT = 'cliente',
    DELIVERY_MAN = 'repartidor'
}

export enum AppResource{
    USER = 'USER',
    ITEM = 'ITEM',
    PROVIDER = 'PROVIDER',
    BILL = 'BILL',
    COMPANY = 'COMPANY',
    INVENTORY = 'INVENTORY',
    ORDER = 'ORDER',
    SALE = 'SALE'
}
export const roles: RolesBuilder = new RolesBuilder();

roles

.grant(AppRoles.CLIENT)
.readAny([AppResource.ITEM,AppResource.INVENTORY])
.readOwn([AppResource.USER,AppResource.SALE])
.create(AppResource.SALE)
.updateOwn(AppResource.SALE,AppResource.USER)

.grant(AppRoles.DELIVERY_MAN)
.readAny([AppResource.SALE,AppResource.INVENTORY])
.updateOwn(AppResource.SALE,AppResource.USER)

.grant(AppRoles.SALESMAN)
.readAny([AppResource.ITEM, AppResource.BILL,AppResource.SALE])
.readOwn([AppResource.USER])
.create(AppResource.BILL)
.updateOwn(AppResource.SALE)

.grant(AppRoles.MANAGER)
.readAny([AppResource.USER, AppResource.ITEM, AppResource.BILL])
.create([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.updateAny([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.deleteAny([AppResource.ITEM, AppResource.COMPANY, AppResource.BILL])

.grant(AppRoles.ADMIN)
.readAny([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.createAny([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.updateAny([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.deleteAny([AppResource.USER, AppResource.ITEM, AppResource.PROVIDER,AppResource.SALE,AppResource.ORDER,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])

