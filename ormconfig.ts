interface DBConnection {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  // entities: Array;
  autoLoadEntities: boolean;
  synchronize: boolean;
}

const DBOption: DBConnection = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'pelatihan_nestjs',
  // entities: [],
  autoLoadEntities: true,
  synchronize: true,
};
