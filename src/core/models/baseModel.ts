export interface BaseModel {
    createdBy?: string | null,
    updatedBy?: string | null,
    deletedBy?: string | null,
    createdAt?: string,
    updatedAt?: string| null,
    deletedAt?: string | null,
}