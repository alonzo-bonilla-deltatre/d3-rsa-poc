import { getFormEntity, recaptchaValidation } from '@/services/formService';
import { sampleForm } from '@/__mocks__/entities/sampleForm';
import axios from 'axios';

jest.mock('axios');

describe('getFormEntity', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should return the correct FormEntity', async () => {
    // ACT
    const form = await getFormEntity(sampleForm);

    // ASSERT
    expect(form.description).toBe(sampleForm.description);
    expect(form.inputFields).toBe(sampleForm.inputFields);
    expect(form.submitActionLabel).toBe(sampleForm.submitActionLabel);
    expect(form.senderEmail).toBe(sampleForm.senderEmail);
    expect(form.subjectEmail).toBe(sampleForm.subjectEmail);
    expect(form.bodyEmail).toBe(sampleForm.bodyEmail);
    expect(form.subjectResponseEmail).toBe(sampleForm.subjectResponseEmail);
    expect(form.bodyResponseEmail).toBe(sampleForm.bodyResponseEmail);
    expect(form.sendResponseEmail).toBe(sampleForm.sendResponseEmail);
    expect(form.sendResponseEmailFormFieldName).toBe(sampleForm.sendResponseEmailFormFieldName);
    expect(form.receiverEmail).toBe(sampleForm.receiverEmail);
  });

  it('should return the correct FormEntity without inputFields', async () => {
    // ARRANGE
    const formEntity = { ...sampleForm, fields: { ...sampleForm.fields, inputFields: undefined } };

    // ACT
    const form = await getFormEntity(formEntity);

    // ASSERT
    expect(form.description).toBe(sampleForm.description);
    expect(form.inputFields).toBe(null);
    expect(form.submitActionLabel).toBe(sampleForm.submitActionLabel);
    expect(form.senderEmail).toBe(sampleForm.senderEmail);
    expect(form.subjectEmail).toBe(sampleForm.subjectEmail);
    expect(form.bodyEmail).toBe(sampleForm.bodyEmail);
    expect(form.subjectResponseEmail).toBe(sampleForm.subjectResponseEmail);
    expect(form.bodyResponseEmail).toBe(sampleForm.bodyResponseEmail);
    expect(form.sendResponseEmail).toBe(sampleForm.sendResponseEmail);
    expect(form.sendResponseEmailFormFieldName).toBe(sampleForm.sendResponseEmailFormFieldName);
    expect(form.receiverEmail).toBe(sampleForm.receiverEmail);
  });
});

describe('recaptchaValidation', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should call the right API URL', async () => {
    // ARRANGE
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    // ACT
    await recaptchaValidation('12345');

    // ASSERT
    expect(axios.post as jest.Mock).toHaveBeenCalledWith(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=12345`
    );
  });

  it('should return true with no env locals', async () => {
    // ARRANGE
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    process.env.RECAPTCHA_SITE_KEY = '';
    process.env.RECAPTCHA_SECRET_KEY = '';

    // ACT
    const res = await recaptchaValidation('12345');

    // ASSERT
    expect(res).toBeTruthy();
  });

  it('should return throw error if success is false', async () => {
    // ARRANGE
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: false } });

    // ACT - ASSERT
    await expect(async () => {
      await recaptchaValidation('12345');
    }).rejects.toThrow();
  });

  it('should return throw error in case of exception', async () => {
    // ASSERT
    (axios.post as jest.Mock).mockRejectedValueOnce({});

    // ACT - ASSERT
    await expect(async () => {
      await recaptchaValidation('12345');
    }).rejects.toThrow();
  });
});
