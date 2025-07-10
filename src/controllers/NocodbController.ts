
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

class NocodbController {
    private apiUrl: string;
    private token: string;
    
    constructor(taula: string, token: string) {
        this.apiUrl = `https://app.nocodb.com/api/v2/tables/${taula}/records`;
        this.token = token;
    }

    getAllItems2(): Promise<any[]> {
        const options: RequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            }
        }

        return fetch(`${this.apiUrl}`, options)
        .then(x => x.json())
        .then((data: NocodbResponse) => data.list)
    
    }

    async getAllItems(): Promise<any[]> {
        const response = await fetch(`${this.apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            }
        });
        const data: NocodbResponse = await response.json();
        return data.list;
    }

    async getItemById(id: string | number): Promise<any> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            }
        });

        const data = await response.json();
        return data;
    }

    async createItem(nuevoItem: Record<string, any>): Promise<any> {
        const response = await fetch(`${this.apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify(nuevoItem)
        });

        const data = await response.json();
        return data;
    }

    async updateItem(nuevosDatos: Record<string, any>, id: string | number): Promise<any> {
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
        return data;
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

export default NocodbController;



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