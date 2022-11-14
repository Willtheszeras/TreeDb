window.addEventListener('DOMContentLoaded', () => {
    const q = document.getElementById('find');
    window.show = function show() {
        console.log(q.value);
    }
    fetch("./data.json").then((a) => a.json()).then((data) => {
        const nodes = [];
        const edges = [];


        function item(obj) {
            console.log(obj);
            nodes.push({
                data: {
                    id: obj.name,
                    text: obj.name,
                    image: obj.icon
                }
            });
            obj.recipe?.forEach((i) => {
                if (typeof i.item != "string") {
                    item(i.item);
                    var n = i.item.name;
                }
                edges.push({
                    data: {
                        source: n || i.item,
                        target: obj.name,
                        text: i.amount.toString()
                    }
                });
            });
        }


        item(data);

        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,

            layout: {
                name: 'cose-bilkent'
            },

            style: [
                {
                    selector: 'node',
                    style: {
                        // 'background-color': '#C6681E',

                        'background-image': ["data(image)"],
                        "text-valign": "center",
                        "width": 100,
                        "height": 100

                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 4,
                        'target-arrow-shape': 'triangle',
                        'line-color': '#BBBBBB',
                        'target-arrow-color': '#BBBBBB',
                        'curve-style': 'bezier',
                    }
                },
                {
                    selector: "[text]",
                    style: {
                        'label': 'data(text)',
                    }
                },
                {
                    selector: ".highlight",
                    style: {
                        "background-color": "yellow"
                    }
                }
            ],

            elements: {
                nodes,
                edges
            }
        });

        window.layout = () => cy.layout({ name: "cose-bilkent" }).run();

        var findInput = document.getElementById("find");
        var items = [];
        window.show = () => (items = [], cy.getElementById(findInput.value).addClass("highlight"), cy.elements().depthFirstSearch({
            roots: cy.getElementById(findInput.value),
            visit: function(v, e, u, i, depth) {
                if (depth > 2) {
                    items.push(v);
                }
            },
            directed: false
        }), items.forEach((i) => i.remove()));
        
        window.reset = () => cy.add(nodes.concat(edges));
    });
});