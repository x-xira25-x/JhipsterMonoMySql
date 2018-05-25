import { BaseEntity } from './../../shared';

export class Bien implements BaseEntity {
    constructor(
        public id?: number,
        public adresse?: string,
        public npa?: number,
        public localite?: string,
        public anneeConstruction?: any,
        public nbPieces?: number,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public prix?: number,
        public typeBien?: BaseEntity,
        public client?: BaseEntity,
        public etatBien?: BaseEntity,
    ) {
    }
}
