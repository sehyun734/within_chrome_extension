import React from "react"
import ReactDOM from "react-dom/client"
import AnnotationManager from "./components/AnnotationManager"
import "./styles/index.css"

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui", // apply css only in shadow DOM

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "annotation-manager",
      position: "overlay",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container)
        root.render(React.createElement(AnnotationManager)) // .js so just class
        return root
      },
      onRemove: (root) => root?.unmount(),
    })

    ui.mount()
  },
})
