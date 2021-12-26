## useImperativeHandle

> `imperative：[ɪmˈperətɪv] 重要的；必要的` useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```javascipt title="语法"
useImperativeHandle(ref, createHandle, [deps])
```

```javascript title="和forwardRef配合使用示例"
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
