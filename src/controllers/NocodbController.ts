
interface NocodbResponse<T = any> {
    list: T[];
    pageInfo?: {
        totalRows?: number;
        page?: number;
        pageSize?: number;
        isFirstPage?: boolean;
        isLastPage?: boolean;
    };
}

interface RequestOptions {
    method: string;
    headers: {
        'Content-Type': string;
        'xc-token': string;
    };
    body?: string;
}

export class NocodbController {
    private apiUrl: string;
    private token: string;
    
    constructor(taula: string, token: string) {
        this.apiUrl = `https://app.nocodb.com/api/v2/tables/${taula}/records`;
        this.token = token;
    }

    //<T> --> Pasar el tipo como parámetro para poder decirle a la función lo que tiene que retornar.
    async getAllItems<T>(): Promise<T[]> {
        const response = await fetch(`${this.apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            }
        });
        const data: NocodbResponse = await response.json();
        return data.list as T[];
    } 

    async getItemById<T>(id: string | number): Promise<T> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            }
        });

        const data = await response.json();
        return data as T;
    }

    async createItem<T>(nuevoItem: T): Promise<T> {
        const response = await fetch(`${this.apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify(nuevoItem)
        });

        const data = await response.json();
        return data as T;
    }

    async updateItem<T>(nuevosDatos: any, id: string | number): Promise<T> {
        nuevosDatos.Id = id;
        const response = await fetch(`${this.apiUrl}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify(nuevosDatos)
        });

        const data = await response.json();
        return data as T;
    }

    async deleteItem(id: string | number): Promise<any> {
        const response = await fetch(`${this.apiUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify({
                Id: id
            })
        });

        const data = await response.json();
        return data;
    }
}



/*
// Exemple d'ús:
const taula = 'xxxxxxxxxx';
const token = 'el_teu_token_aqui';

const itemsController = new NocodbController(taula, token);

// Obté totes les items
itemsController.getAllItems().then(data => console.log(data));

// Obté un item per ID
const itemId = 1;
itemsController.getItemById(itemId).then(data => console.log(data));

// Crea un nou item
const nouItem = {
    nom: 'Paella',
    foto: 'paella.jpg',
    descripcio: 'Una deliciosa paella'
};
itemsController.createItem(nouItem.nom, nouItem.foto, nouItem.descripcio).then(data => console.log(data));

// Actualitza un item existent
const itemActualitzada = {
    id: 1,
    nom: 'Paella Valenciana',
    foto: 'paella_valenciana.jpg',
    descripcio: 'La veritable paella valenciana'
};
itemsController.updateItem(itemActualitzada.id, itemActualitzada.nom, itemActual
*/