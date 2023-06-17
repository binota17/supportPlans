// Temporary Data until we connect with Firebase


export interface TempDataValue {
    id:number;
    name: string;
    color: string;
    todos: {
        title: string;
        completed: boolean;
    }[]  
  }

export const tempData: TempDataValue[] = [
    {
        id:1,
        name: "Di du lich",
        color: "#24A6D9",
        todos: [
            {
                title: "Mua ve",
                completed: false
            },
            {
                title: "Mua thuc an",
                completed: true
            },
            {
                title: "Dat phong",
                completed: true
            },
            {
                title: "Ru ban be",
                completed: false
            }
        ]
    },
    {
        id:2,
        name: "Di hoc",
        color: "#8022D9",
        todos: [
            {
                title: "Mua ve xe",
                completed: false
            },
            {
                title: "Chuan bi do",
                completed: true
            },
            {
                title: "Cho ca an",
                completed:true
            },
            {
                title: "Khoa cua",
                completed:true
            },
            {
                title: "Mang mu bao hiem",
                completed:true
            },
        ]
    },
    {
        id:3,
        name: "Sinh nhat",
        color: "#595BD9",
        todos: [
            {
                title: "Thoi bong bong",
                completed: false
            },
            {
                title: "Moi ban be",
                completed: true
            },
            {
                title: "Mo qua",
                completed: true
            },
            
        ]
    }
]