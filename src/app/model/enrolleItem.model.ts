export class EnrolleItem {
id: string;
active: boolean;
dateOfBirth: string;
name : string;

constructor(id,name, active, dob){
    this.active = active;
    this.id = id;
    this.dateOfBirth = dob;
    this.name = name;
}
}