(function () {
    const sheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7S-83ylp-gnwHDMtLUnYfA5RkHPtrxX8If67wYvblpMAkleLw1SCGUILPyQ1L8ymvWAZvYotQLrJn/pub?output=csv";
    const container = document.getElementById("eventTable");

    // configuration for element creation

    let pageConfig = {
        page1: {
            filter: "",

            backgroundImg: {
                class: ["snipbg", "date"],
                defaultImg: ["https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/06/Star-citizen-guns-2x1-feature.jpg"],
                columnName: ["image", "icon"]
            },

            elementConfig: {
                a: {
                    type: "div",
                    class: "snipbg",
                    columnName: "",
                    data: []
                },

                b: {
                    type: "div",
                    class: "date",
                    columnName: "",
                    data: []
                },

                c: {
                    type: "i",
                    class: "fab fa-guilded",
                    columnName: "",
                    data: []
                },

                d: {
                    type: "h3",
                    class: "null",
                    columnName: "name",
                    data: []
                },

                e: {
                    type: "p",
                    class: "eventText",
                    columnName: "eventinfo",
                    data: []
                },
    
                f: {
                    type: "button",
                    class: "null",
                    columnName: "eventURL",
                    data: []
                }

            }
        }
    }

    window.addEventListener('DOMContentLoaded', init);

    function init() {
        Papa.parse(sheet, {
            download: true,
            header: true,
            complete: eventPostInit
        })
    }

    // Runs all functions ect

    function eventPostInit(results) {
        const pageElements = selectPage(pageConfig);
        const data = results.data;
        const calendarContent = (() => { if (pageElements.filter) { return filterContent(pageElements, data, "name"); } else { return data } })();
        assignData(pageElements.elementConfig, calendarContent);
        const finishedElements = elementCreator(pageElements.elementConfig);
        addToPage(finishedElements);
        addBackgroundImg(pageElements.backgroundImg, calendarContent);
        typeWriterText();  
    }

    // Select the config for specific page

    function selectPage(pagesConfig) {
        const body = document.getElementsByTagName("body");
        return pagesConfig[body[0].id];
    }

    // Remove objects from spreadhseet data by searching spreadsheet column for specific text

    function filterContent(pageConfig, content, colName) {
        const filter = "^" + pageConfig.filter;
        const expression = new RegExp(filter, "i");
        return content.filter(item => expression.test(item[colName]));
    }

    function assignData(dataAreas, data) {
        data.forEach(row => {
            for (x in dataAreas) {
                dataAreas[x].data.push(row[dataAreas[x].columnName])
            }
        });
    }

    // Create HTML elements

    function elementCreator(elements) {
        let allElements = [];

        for (i = 0; i < elements.a.data.length; i++) {
            let elementSet = [];
            for (x in elements) {
                let newElement = document.createElement(elements[x].type);
                newElement.className = elements[x].class;
                addContentNew(newElement, elements[x].data[i], elements[x].type);
                elementSet.push(newElement);
            }
            allElements.push(elementSet);
        }
        return allElements;
    }

    // Add content from spreadsheet to HTML elements

    function addContentNew(ele, content, type) {
        if (content) {
            switch (type) {
                case "img":
                    ele.src = content;
                    break;
                case "button":
                    ele.onclick = function () {
                        window.open(content, "_blank");
                    }
                    break;
                case "a":
                    ele.href = content;
                default:
                    ele.innerHTML = content;
            }
        }
    }

    //Add finished element to the web page

    function addToPage(elements) {
        for (i = 0; i < elements.length; i++) {
            let innerContainer = document.createElement("figure")
            innerContainer.className = "calendarItem"
            for (j = 0; j < elements[i].length; j++) {
                innerContainer.appendChild(elements[i][j]);
            }
            container.appendChild(innerContainer);
        }
    }

    //Add a background image to a selected element

    function addBackgroundImg(imgConfig, content) {
        if (imgConfig.class) {
            for (i = 0; i < imgConfig.class.length; i++) {
                let elemArr = document.getElementsByClassName(imgConfig.class[i]);
                for (j = 0; j < elemArr.length; j++) {
                    if (content[i][imgConfig.columnName[i]]) {
                        elemArr[j].style.backgroundImage = "url('" + content[j][imgConfig.columnName[i]] + "')";
                    } else {
                        elemArr[j].style.backgroundImage = "url('" + imgConfig.defaultImg[i] + "')";
                    }
                }
            }
        }
    }
})();
