const app = document.getElementById("app");
const boardSize = document.getElementById("board-size-input");
const random = document.getElementById("random");
const clear = document.getElementById("clear");

class Color {
    constructor(element, red, green, blue) {
        this.element = element;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    generate = async () => {
        const opacity = Math.round(Math.random() * 100) / 100;
        const color = [this.red, this.green, this.blue, opacity];
        this.element.style.backgroundColor = `rgba(${color.join(',')})`;
    }

    async hover() {
        this.element.addEventListener('mouseover', this.generate);
    }

    async clear() {
        this.element.style.backgroundColor = `#fff`;
    }
}

function createTable(size) {
    // Creates a table of n-size
    const table = document.createElement('table');
    const blocks = [];
    
    Array(size).fill(null).map(() => {
        const row = document.createElement('tr');

        Array(size).fill(null).map(() => {
            const column = document.createElement('td');
            column.classList.add("block");

            const div = document.createElement('div');

            column.style.width = `calc(100% / ${size})`;
            div.style.paddingTop = `100%`;

            column.appendChild(div);
            row.appendChild(column);
            blocks.push(column);
        });
        
        table.appendChild(row);
    });

    return [table, blocks];
}

const [table, blocks] = createTable(30);
app.appendChild(table);

blocks.map((block) => {
    const el = new Color(block, 16, 79, 85);
    el.hover();

    random.addEventListener('click', () => el.generate());
    clear.addEventListener('click', () => el.clear());
});
