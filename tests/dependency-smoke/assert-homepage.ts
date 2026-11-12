import { expect, type Page } from '@playwright/test';

export async function assertHomepage(page: Page) {
    const response = await page.goto('/', {
        waitUntil: 'domcontentloaded',
    });

    expect(response?.status(), 'Homepage HTTP response').toBe(200);
    expect(new URL(page.url()).pathname, 'Must remain at the homepage').toBe('/');
    await expect.poll(() => page.evaluate(() => (window as any).__smokeMounted), {
        message: 'Application must mount',
    }).toBe(true);
    await expect(page.locator('.hydrate')).toBeVisible();
    await expect(page.locator('main.vs-main-container')).toBeVisible();
    await expect(page.getByRole('heading', {
        level: 1,
        name: 'Plan your business event in Scotland',
        exact: true,
    })).toBeVisible();
    await expect(page.getByText('Practical advice for your business event.', {
        exact: true,
    })).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Test whether any remaining skeleton covers real content, rather than
    // requiring a particular DOM removal strategy or changing production CSS.
    const heading = page.getByRole('heading', {
        level: 1,
    });

    await heading.scrollIntoViewIfNeeded();
    await expect.poll(() => heading.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const top = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);

        return !!top && !top.closest('.skeleton-site');
    }), {
        message: 'Loading skeleton must not cover homepage content',
    }).toBe(true);

    // The component-library mobile menu proves client event handlers are attached.
    await page.setViewportSize({
        width: 390,
        height: 844, 
    });
    const control = page.getByRole('button', {
        name: /Open menu/,
    });
    await control.click();
    await expect(page.locator('.vs-mega-nav-mobile').first()).toBeVisible();
    await control.click();
    await expect(page.locator('.vs-mega-nav-mobile').first()).toBeHidden();
    await expect(page.locator('main.vs-main-container')).toBeVisible();
}
