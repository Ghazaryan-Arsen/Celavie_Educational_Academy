import type {
  NiceExchangeApplicationInsert,
  NiceExchangeApplicationRow,
  NiceExchangeApplicationStatus,
} from './niceExchange';

type NiceExchangeApplicationUpdate = Partial<Omit<NiceExchangeApplicationInsert, 'status'>> & {
  status?: NiceExchangeApplicationStatus;
};

export interface Database {
  public: {
    Tables: {
      nice_exchange_applications: {
        Row: NiceExchangeApplicationRow;
        Insert: NiceExchangeApplicationInsert;
        Update: NiceExchangeApplicationUpdate;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
