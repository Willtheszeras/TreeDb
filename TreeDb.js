window.addEventListener('DOMContentLoaded', function () {

    fetch("./data.json").then((a) => a.json()).then((data) => {
        const nodes = [];
        const edges = [];
    
        function item(obj) {
            console.log(obj);
            nodes.push({
                data: {
                    id: obj.name,
                    text: obj.name
                }
            });
            obj.recipe.forEach((i) => {
                if (typeof i.item != "string") {
                    item(i.item);
                    var n = i.item.name;
                }
                edges.push({
                    data: {
                        source: obj.name,
                        target: n || i.item,
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
    
                        // 'background-image': ["./factorio.png", "data(image)"],
                        "text-valign": "center",
                        "shape": "rectangle",
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
                        // 'curve-style': 'taxi',
                    }
                },
                {
                    selector: "[text]",
                    style: {
                        'label' : 'data(text)',
                    }
                }
            ],
    
            elements: {
                nodes,
                edges
            }
        });

        window.layout = () => cy.layout({name: "cose-bilkent"});
    });
});