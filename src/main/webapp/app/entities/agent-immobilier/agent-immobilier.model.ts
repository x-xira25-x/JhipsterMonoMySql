import { BaseEntity, User } from './../../shared';

export class AgentImmobilier implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public npa?: string,
        public localite?: string,
        public numTel?: string,
        public email?: string,
        public adresse?: string,
        public user?: User,
    ) {
    }
}
