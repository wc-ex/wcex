/**

    遍历传入的 linkList 自动计算和更新元素间的连接线
    连接点可以计算附加点位置，并根据最短路径原则进行连接，连线类型为曲线
    连接线应自动避让nodeList中的元素
    连线应自动避让DOM元素，并且避免交叉    
*/
interface ILink{
    to:HTMLElement,
    from:HTMLElement,
    line:SVGAElement;
}
function updateLines(nodeList:HTMLElement[],linkList:ILink[]) {
for (const link of linkList) {
    const fromRect = link.from.getBoundingClientRect();
    const toRect = link.to.getBoundingClientRect();
    const fromCenter = {
        x: fromRect.left + fromRect.width / 2,
        y: fromRect.top + fromRect.height / 2
    };
    const toCenter = {
        x: toRect.left + toRect.width / 2,
        y: toRect.top + toRect.height / 2
    };
    const line = link.line;
    const path = `M${fromCenter.x},${fromCenter.y} Q${fromCenter.x},${toCenter.y} ${toCenter.x},${toCenter.y}`;
    line.setAttribute('d', path);
}


}