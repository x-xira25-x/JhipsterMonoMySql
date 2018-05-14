import { BaseEntity, User } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public npa?: number,
        public localite?: string,
        public numTel?: string,
        public email?: string,
        public user?: User,
        public typeClients?: BaseEntity[],
        public visites?: BaseEntity[],
    ) {
    }
}
