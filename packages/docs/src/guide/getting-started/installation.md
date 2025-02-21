<script setup>
  import { data } from '../../versions.data'
  const { version } = data
</script>

# Installation

The first step is to add the `@nelitow/connectors` dependency to your project. You can do this using the following command:

::: code-group

```sh-vue [npm]
npm install @nelitow/connectors@{{version}} --save
```

```sh-vue [pnpm]
pnpm add @nelitow/connectors@{{version}}
```

```sh-vue [bun]
bun add @nelitow/connectors@{{version}}
```

:::

**Note**: Use version `{{version}}` to ensure compatibility with `testnet` network—check the [docs](https://docs.fuel.network/guides/installation/#using-the-latest-toolchain).
