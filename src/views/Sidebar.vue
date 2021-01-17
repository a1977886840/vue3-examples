<template>
  <div>
    <h1>Vue示例</h1>
    <ul>
      <li><router-link to="/example01">welcome</router-link></li>
      <li>
        <router-link to="/example02">data & computed & methods</router-link>
      </li>
      <li>
        route with params
        <ul>
          <li>
            <router-link to="/example03/students/12/homeworks/1">
              sid:12; hid:1
            </router-link>
          </li>
          <li>
            <router-link to="/example03/students/74/homeworks/2">
              sid:74; hid:2
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        directives
        <ul>
          <li><router-link to="/example04-01">template & if</router-link></li>
          <li><router-link to="/example04-02">v-bind</router-link></li>
          <li><router-link to="/example04-03">v-for</router-link></li>
        </ul>
      </li>
      <li>
        Composition-API
        <ul>
          <li><router-link to="/example05-01">setup()</router-link></li>
          <li><router-link to="/example05-02">Integration</router-link></li>
          <li>
            <router-link to="/example05-03/students/45/homeworks/23">
              props
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        Form Input Bindings
        <ul>
          <li><router-link to="/example06-01">v-module</router-link></li>
          <li><router-link to="/example06-02">Examples</router-link></li>
        </ul>
      </li>
      <li>
        Vuex
        <ul>
          <li><router-link to="/example07-01">Examples</router-link></li>
          <li></li>
          <li></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
