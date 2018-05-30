import {BaseEntity} from "../shared";


export class Visite implements BaseEntity {
    constructor(
        public id?: number,
        public dateDebut?: any,
        public dateFin?: any,
        public etatVisite?: BaseEntity,
        public bien?: BaseEntity,
        public agentImmobilier?: BaseEntity,
        public clients?: BaseEntity[],
    ) {
    }
}
