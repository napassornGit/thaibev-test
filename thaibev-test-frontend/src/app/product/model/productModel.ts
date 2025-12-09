interface product {
    id: number;
    code: string;
    create_at: Date;
    create_by: string;
}

interface productResponse {
    result: boolean;
    statusCode: number;
    message: string;
    data: product[];
}

export {
    product,
    productResponse
}