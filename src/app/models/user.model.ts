export class User {
    id: string;
    name: string;
    password: string;
    rol: string;
    area: string;

    constructor(
        id: string = '',
        name: string = '',
        password: string = '',
        rol: string = '',
        area: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.rol = rol;
        this.area = area;
    }
}