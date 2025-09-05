import {test, expect} from '@playwright/test';

test('home page loads', async ({page}) => {
    await page.goto('/')
    await expect(page.getByRole('link', {name:'Shady Meadows B&B'})).toBeVisible()
});
test('test sending a message', async ({page}) => {
    await page.goto('https://automationintesting.online/')
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john.doe@gmail.com');
    await page.getByLabel('Phone').fill('123-456-7890');
    await page.getByRole('textbox', {name:'Subject'}).fill('Test Message');
    await page.getByTestId('ContactDescription').fill('Hello, this is a test message.');
    await page.getByRole('button', {name:'Submit'}).click();
    // verify the form fields contain the submitted values
    await expect(page.getByLabel('Name')).toHaveValue('John Doe');
    await expect(page.getByLabel('Subject')).toHaveValue('Test Message');
});
test('test availability', async ({page}) => {
    await page.goto('https://automationintesting.online/')
    await page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox').click();
    await page.getByRole('option', { name: 'Choose Monday, 1 September' }).click();
    await page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox').click();
    await page.getByRole('option', { name: 'Choose Thursday, 4 September' }).click();
    await page.getByRole('button', { name: 'Check Availability' }).click();
    await page.locator('div').filter({ hasText: /^£100 per nightBook now$/ }).getByRole('link').click();
    await expect(page).toHaveURL('https://automationintesting.online/reservation/1?checkin=2025-09-01&checkout=2025-09-04');
});