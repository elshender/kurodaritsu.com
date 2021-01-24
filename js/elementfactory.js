(function () {
    const sheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7S-83ylp-gnwHDMtLUnYfA5RkHPtrxX8If67wYvblpMAkleLw1SCGUILPyQ1L8ymvWAZvYotQLrJn/pub?output=csv";
    const container = document.getElementById("eventTable");

    // configuration for element creation

    let elementConfig = {
        page1: {
            filter: "",

            backgroundImg: {
                class: "eventTable",
                defaultImg: "https://s3-us-west-2.amazonaws.com/www.guilded.gg/UserAvatar/2d3cbe63a784c7dbab026d338880437b-Large.png?w=450&h=450age",
                columnName: "image"
            },

            a: {
                type: "img",
                class: "test",
                columnName: "icon"
            },
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
        const pageElements = selectPage(elementConfig);
        const data = results.data;
        const calendarContent = (() => { if (pageElements.filter) { return filterContent(pageElements, data, "name"); } else { return data } })();
        const contentOrder = contentAddOrder(pageElements, "columnName");
        const unfinishedElements = produceElements(pageElements, calendarContent);
        const finishedElements = addContent(unfinishedElements, calendarContent, contentOrder);
        addToPage(finishedElements);
        addBackgroundImg(pageElements.backgroundImg, calendarContent);
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

    // Creates order of content to be inserted into created elements
    function contentAddOrder(pageConfig, selector) {
        let orderArr = [];
        for (x in pageConfig) {
            if (pageConfig[x].hasOwnProperty('type')) {
                orderArr.push(pageConfig[x][selector]);
            }
        }
        return orderArr;
    }

    // Create HTML elements

    function produceElements(elements, entries) {
        let allElements = [];
        const dataKeys = Object.keys(entries);
        for (i = 0; i < dataKeys.length; i++) {
            let elementSet = [];
            for (x in elements) {
                let selectedEle = elements[x]
                if (selectedEle.hasOwnProperty('type')) {
                    let newElement = document.createElement(selectedEle.type);
                    newElement.className = selectedEle.class;
                    elementSet.push(newElement);
                }
            }
            allElements.push(elementSet);
        }
        return allElements;
    }

    // Add content from spreadsheet to HTML elements

    function addContent(elements, content, types) {
        for (i = 0; i < elements.length; i++) {
            for (j = 0; j < elements[0].length; j++) {
                let ele = elements[i][j];
                let item = content[i][types[j]];
                if (item) {
                    switch (ele.tagName) {
                        case "IMG":
                            ele.src = item;
                            break;
                        case "BUTTON":
                            ele.onclick = function () {
                                window.open(item, "_blank");
                            }
                            break;
                        case "A":
                            ele.href = item;
                        default:
                            ele.innerHTML = item;
                    }
                }
            }
        }
        return elements;
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
            let elemArr = document.getElementsByClassName(imgConfig.class);
            for (i = 0; i < elemArr.length; i++) {
                if (content[i][imgConfig.columnName]) {
                    elemArr[i].style.backgroundImage = "url('" + content[i][imgConfig.columnName] + "')";
                } else {
                    elemArr[i].style.backgroundImage = "url('" + imgConfig.defaultImg + "')";
                }
            }
        }
    }
})();
