function generateNewDocumentId() {
    if (sessionStorage.getItem("lastId") == null) {
        sessionStorage.setItem("lastId", 0)
    }
    let newDocumentId = parseInt(sessionStorage.getItem("lastId")) + 1
    sessionStorage.setItem("lastId", newDocumentId)
    return newDocumentId
}

function loadDocument(id) {
    let documentItem = getDocumentById(id);

    let documentIdInput = document.querySelector(".document-id");
    documentIdInput.value = id;

    let documentTitleInput = document.querySelector(".document-title-input input");
    documentTitleInput.value = documentItem.documentName;

    let documentContent = document.getElementById("editor");
    documentContent.innerHTML = documentItem.documentContent;
}

function getDocumentById(id) {
    let documentArray = getAllDocument();
    for (let i = 0; i < documentArray.length; ++i) {
        let documentItem = documentArray[i];
        if (documentItem.documentId == id) {
            return documentItem;
        }
    }
    return null;
}

function getAllDocument() {
    let documentArrayJSON = sessionStorage.getItem("documents");
    let documentArray = [];
    if (documentArrayJSON != null) {
        documentArray = JSON.parse(documentArrayJSON);
    }
    return documentArray;
}

function saveDocument(documentId, documentName, documentContent) {
    let date = new Date();  
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    let lastModified = date.toLocaleTimeString("en-us", options) 
    let modifiedDocumentItem = {
        documentId: documentId,
        documentName: documentName,
        documentContent: documentContent,
        lastModified: lastModified
    }

    let documentArray = getAllDocument();
    for (let i = 0; i < documentArray.length; ++i) {
        let documentItem = documentArray[i];
        if (documentItem.documentId == documentId) {
            documentArray[i] = modifiedDocumentItem;
            break;
        }
    }
    sessionStorage.setItem("documents", JSON.stringify(documentArray))
}

function createNewDocument(documentName, documentContent) {
    let documentId = generateNewDocumentId()

    let date = new Date();  
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    let lastModified = date.toLocaleTimeString("en-us", options) 
    let documentItem = {
        documentId: documentId,
        documentName: documentName,
        documentContent: documentContent,
        lastModified: lastModified
    }

    let documentArray = sessionStorage.getItem("documents");
    if (documentArray == null) {
        documentArray = [];
    } else {
        documentArray = JSON.parse(documentArray);
    }
    documentArray.push(documentItem)
    sessionStorage.setItem("documents", JSON.stringify(documentArray))
}

function deleteDocument(documentId) {
    let documentArray = getAllDocument();
    for (let i = 0; i < documentArray.length; ++i) {
        let documentItem = documentArray[i];
        if (documentItem.documentId == documentId) {
            let temp = documentArray[0];
            documentArray[0] = documentItem;
            documentArray[i] = temp;
            documentArray.shift();
            break;
        }
    }
    sessionStorage.setItem("documents", JSON.stringify(documentArray));
}

function isDocumentExists(documentId) {
    if (getDocumentById(documentId) != null) {
        return true;
    }
    return false;
}

function downloadDocument(documentId) {
    let documentItem = getDocumentById(documentId);

    const link = document.createElement("a");
    link.href = `data:text/html,${encodeURIComponent(documentItem.documentContent)}`;
    link.download = documentItem.documentName + ".html";
    link.click();
}
