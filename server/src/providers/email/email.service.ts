import { envConfig, EnvConfig } from '@common/configs/env.config';
import { injectable } from 'tsyringe';

@injectable()
export class EmailService {
  private _env: EnvConfig;
  constructor(private mailer: any) {
    this._env = envConfig();
  }

  send(options: any) {
    if (this._env.mode !== 'test') {
      return this.mailer.sendMail(options);
    }
    return null;
  }

  public async sendWelcome(toEmail: string): Promise<void> {
    await this.send({
      template: 'welcome',
      to: toEmail,
      subject: '🥳🎉 Welcome to the Zeta Shop',
      context: {
        siteUrl: this._env.clientUrl,
      },
    }).then();
  }

  public async sendResetPassword(toEmail: string, token: string): Promise<void> {
    const tokenUrl = `${this._env.clientUrl}/reset-password?token=${token}`;
    await this.send({
      template: 'reset-password',
      to: toEmail,
      subject: '🔑 Request to recover your password',
      context: {
        tokenUrl,
      },
    }).then();
  }

  public async sendEmailConfirmation(toEmail: string, token: string): Promise<void> {
    const tokenUrl = `${this._env.clientUrl}/activate?token=${token}`;
    await this.send({
      template: 'email-confirmation',
      to: toEmail,
      subject: 'Confirmation you email registration',
      context: {
        tokenUrl,
      },
    }).then();
  }
}
