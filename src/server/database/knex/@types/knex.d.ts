import { ICity, IGroups, IPerson, IUser, IUserGroups } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    user: IUser;
    groups: IGroups;
    user_groups: IUserGroups;
  }
}
