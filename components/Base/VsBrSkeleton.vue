<template>
    <div
        class="skeleton-site"
        style="opacity: 0.4;
            width: 100vw;
            height: 100vh;
            overflow: hidden;"
    >
        <div
            style="height: 32px;
                background-color: #700e57;"
        >
            <div class="fake-container">
                <div
                    class="fake-link"
                    style="height: 1.25em;
                        margin-top: .25em;
                        background-color: white;"
                />
            </div>
        </div>
        <div
            style="height: 45px;
                background-color: #eeeeee"
        >
            <div class="fake-container">
                <div class="fake-link" />
                <div class="fake-link" />
                <div class="fake-link" />
                <div class="fake-search" />
            </div>
        </div>
        <div
            style="height: 100vh;
                background-color: #bbbbbb;
                position: relative;"
        />
        <div
            class="fake-container"
            style="bottom: 0;
                height: 120px;
                background-color: #ffffff;
                z-index: 2;
                padding: 1em 4em;"
        >
            <div class="fake-link" />
        </div>
    </div>
</template>

<style>
    .fake-container {
        position: absolute;
        width: 90%;
        max-width: 1340px;
        left: 50%;
        transform: translateX(-50%);
    }

    .fake-link {
        height: 1.5em;
        width: 8em;
        border-radius: 0.25em;
        background-color: #bbbbbb;
        display: inline-block;
        margin: 0.5em 1em;
    }

    .fake-search {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 8em;
        background-color: #af006e;
    }
</style>
