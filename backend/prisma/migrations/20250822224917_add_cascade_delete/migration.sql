-- DropForeignKey
ALTER TABLE "public"."roomsGuests" DROP CONSTRAINT "roomsGuests_room_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."roomsGuests" ADD CONSTRAINT "roomsGuests_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
