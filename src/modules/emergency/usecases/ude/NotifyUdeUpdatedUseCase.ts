import { Injectable, NotFoundException } from '@nestjs/common';


import { Environment as envs } from '@/Environment';
import { ErrorMessages } from '@/core/helpers/ErrorMessages';
import { UdeRepository } from '@/emergency/repositories/UdeRepository';
import { NotifyUdeUpdatedPayload } from '@/emergency/structures/payloads/NotifyUdeUpdatedPayload';
import { connect } from "mqtt"; // import connect from mqtt

@Injectable()
export class NotifyUdeUpdatedUseCase {
  constructor(
    private readonly udeRepository: UdeRepository,
  ) { }

  async execute(id: number): Promise<NotifyUdeUpdatedPayload> {
    const model = await this.udeRepository.findById(id);
    if (!model) {
      throw new NotFoundException(ErrorMessages.emergency.ude.notFound);
    }

    return new Promise((resolve, reject) => {
      let client = connect('tcp://broker.mqtt.cool:1883');

      client.on("connect", async () => {
        const payload = NotifyUdeUpdatedPayload.parse(model);
        await client.publish(envs.MQTT_TOPIC_UPDATE_UDE, JSON.stringify(payload));

        const util = require('util')
        console.log(util.inspect(payload, { showHidden: false, depth: null, colors: true }))

        resolve(payload);
      });

      client.on("error", async (error) => {
        reject(error);
      });
    })
  }
}
