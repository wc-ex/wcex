import { Scope } from "wcex";
import { ScopedElement } from "wcex/types/plugins/IPlugins";

export default class extends Scope {
    routeName=""
    onReady() {
        window.addEventListener("route-change", () => {
          this.applyRouteChanged();
        });
      }
      onDestory() {
        window.removeEventListener("route-change", () => {
          this.applyRouteChanged();
        });
      }

      /**
       * 应用路由变化
       */
      applyRouteChanged() {
        let _self = this;
        function _applyChecked(el:ScopedElement, checked:boolean) {
          if (el.$scope) {
            el.$scope.checked = checked;
          } else {
            if (checked) el.setAttribute("checked", "1");
            else el.removeAttribute("checked");
          }
        }
        function _checkRouteMatch(el:ScopedElement) {
          let r = _self.$router.route[_self.routeName];
          let href = el.getAttribute("href");
          if (!href || !r) return;

          try {
            let parsed = _self.$router.parse(href);
            let parsedRoute = parsed[_self.routeName];

            if (!parsedRoute) throw Error("not match route");

            if (parsedRoute.tag && parsedRoute.tag != r.tag)
              throw Error("not match tag");
            // 比对路由参数
            for (let key of Object.keys(parsedRoute.attrs)) {
              if (parsedRoute.attrs[key] != r.attrs[key])
                throw Error("not match attrs");
            }
            console.log(`check route match`, _self.routeName, r, el);
            // 设置 checked 属性,如果
            _applyChecked(el, true);
          } catch (e) {
            _applyChecked(el, false);
          }
        }
        let r = this.$router.route[this.routeName];
        // 为匹配的子项设置 checked 属性
        let slotEl = this.$id.slot as HTMLSlotElement;
        slotEl?.assignedElements()?.forEach((item) => {
          _checkRouteMatch(item as ScopedElement);
          item.querySelectorAll("[href]").forEach((item) => {
            _checkRouteMatch(item as ScopedElement);
          });
        });
      }

      onClick(ev: CustomEvent) {
        let el = ev.target as HTMLElement;
        const href = el.getAttribute("href");
        if (!href) return;

        if (href) {
          this.$router.go(href,undefined,undefined);
        }
      }
}
