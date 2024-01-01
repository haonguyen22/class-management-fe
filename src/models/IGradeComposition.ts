export interface GradeStructure {
  id: number;
  name: string;
  weight: number;
  priotity: number;
}

export interface AddGradeStructureDTO {
  data: GradeStructure[];
}

export interface AddGradeStructureItemDTO {
  name: string;
  weight: number;
}

export interface UpdateGradeStructureItemDTO {
  name: string;
  weight: number;
}

export interface GradeComposition {
  name: string;
  weight: number;
}
