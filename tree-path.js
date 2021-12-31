import fs from 'fs';
import path from 'path';

class TreeNode {

    constructor(dirPath) {
        this.path = dirPath;
        this.name = null;
        this.type = null;
        this.size = null;
        this.children = [];
    }
}

function getSize(filePath){ //gets byte size
  var byteSize = fs.statSync(filePath).size;
  return formatBytes(byteSize);

}

function formatBytes(bytes, decimals = 2) { //byte size conversion
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getChildPath(currentNode, child){ //child path from current path
    var currentPath = `${currentNode.path}`;
    var subChild = `${child}`;
    const childPath = currentPath + "/" + subChild;
    return childPath;
}

function buildTree(rootPath, depth) {
    try {
        const root = new TreeNode(rootPath);
        const stack = [root];
        while (stack.length) {
            const currentNode = stack.pop();

            if (currentNode) {
                const children = fs.readdirSync(currentNode.path);

                for (let child of children) {

                    const childPath = getChildPath(currentNode, child);
                    const childNode = new TreeNode(childPath);

                    if (fs.statSync(currentNode.path).isDirectory()) {
                        currentNode.size = getSize(currentNode.path);
                        currentNode.type = "directory";
                        currentNode.name = path.parse(currentNode.path).name;
                    }

                    if (fs.statSync(childNode.path).isDirectory()) {
                        childNode.size = getSize(childNode.path);
                        childNode.type = "directory";
                        childNode.name = path.parse(childNode.path).name;
                    }

                    if (fs.statSync(childNode.path).isFile()) {
                        childNode.size = getSize(childNode.path)
                        childNode.extension = path.extname(childNode.path);
                        childNode.type = "file";
                        childNode.name = path.parse(childNode.path).base;
                    }

                    currentNode.children.push(childNode);
                    const isDirectory = fs.statSync(childNode.path).isDirectory();

                    if (isDirectory) {
                        stack.push(childNode);
                    }
                }
            }
        }
        return root;
    } catch (e) {
        console.log(e)
    }
}

const resolvers = {
    Query: {
        fileDirectory: (root, {rootPath, depth}) => {
            return buildTree(rootPath, depth);
        }
    }
}

export default resolvers;
