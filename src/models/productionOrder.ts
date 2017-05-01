/**
 * Production Order Mock interface
 * 
 * This interface describes the required properties of a mock Production Order
 */
export interface ProductionOrder {
    id: number;
    name: string;
    description: string;
    commodity: {
        name: string;
        description: string;
    },
    customer: string;
    quantity: number;
    unit: string;
    dueDate: Date;
}