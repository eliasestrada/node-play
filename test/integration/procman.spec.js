const chai = require('chai');
const ProcMan  = require('../../src/processor/procman.js');
const dbg = require('debug')('node-play:integration-test-proc-man');
const util = require('@mediagoom/opflow/util');

var expect = chai.expect;

function tval(name, def)
{
    if(null == process.env[name])
    {
        return def;
    }

    return process.env[name];
}


function check( done, f ) {
    try {
        f();
        done();
    } catch( e ) {
        done( e );
    }
}



function test_proc_man(owner, proc_man_options)
{
    /*
    const proc_man_options = {statusman : require_status_man_string};
    
    if(undefined !== require_proc_man_string)
    {
        proc_man_options.processor = require_proc_man_string;
    }
    */

    let p     = new ProcMan(proc_man_options);
    let id    = '';
    //let owner = "uploader";
    let name  = 'TEST';

    it('reserve name', async () => {
               
        const idx = await p.reserve_name(owner, name);
        expect(idx).to.be.a('string');
                    
        id = idx;

        dbg('-----', id, '------');
        

    });

    it('queue job', async () => {
    
        let file = tval('TESTMEDIAFILE', './test/integration/MEDIA1.MP4');
       
        const timeout_ms = 1000000;
        
        await p.queue_job(owner, id, file);
        
        expect(id).to.be.a('string');     
        expect(id).to.be.match(/\d{10,12}_TEST/);

        const start = new Date();

        let status = (await p.status(owner, id));
        expect(status).to.have.property('status');
        
        while('ok' != status.status)
        {
            await util.Wait(500);

            const now = new Date();
            if( timeout_ms < (now.getTime() - start.getTime()))
            {
                throw new Error('timeout');
            }
        
            dbg('STATUS %O %s', status, now);

            expect(status.status).to.be.oneOf(['queued', 'working']);
            
            status = (await p.status(owner, id));
            expect(status).to.have.property('status');
        }

        expect(status.status).to.be.eq('ok');

        if(typeof p.stop === 'function')
        {
            p.stop();
        }
                 

    });


    it('list', (done) => {
        
        p.list(owner).then(
            (list) => {
                    
                check(done, ()=> {
                        
                    let r = {
                        assets : [
                            {
                                owner : owner
                                , id : id
                            }
                        ]
                    };

                    expect(list).to.be.deep.equal(r);

                });
                 
            }

            , (err) => {done(err);}

        );
        
    });

    it('status', (done) => {
        
        let r = {
            status   : 'ok'
            , name   : 'TEST'        
            , id     : id
            , owner  : owner
            , datetime : null
            , creationtime : null
            , processing: null
            , hls3   : 'STATIC/main.m3u8'
            , dash   : 'STATIC/index.mpd'
            , thumb  : ['img001.jpg', 'img002.jpg', 'img003.jpg', 'img004.jpg']
            , previous: ['reserved']
            , hls4   : null
            , playready : null
            , widevine: null
        };

        p.status(owner, id).then(
            (status) => {

                status.datetime = null;
                status.creationtime  = null;
                status.processing = null;
                
                delete status.queue_id;
                      
                      
                check(done, () => {
                      
                    expect(status).to.be.deep.equal(r);
                      
                });

            }
            , (err) => {done(err);}
        );
        
        
    });

}


describe('PROCESS MANAGER', () => {

    it('set up correctly', (done) => {
                    
        expect(ProcMan).to.be.a('function');
                  
        let p = new ProcMan();
                  
        expect(p).to.be.a('object');

        check(done, ()=> {

            //console.log(p.get_full_name());
            //console.log(p.get_target_dir());

        });

    });

    const proc_man_options = {status_man_use : '../../test/integration/fake_stateman.js'};
    
    describe('Fake StatMan', () => {

        test_proc_man('fake', proc_man_options);
        
    });

    describe('proc-man should handle queue error', async () =>{
        
        proc_man_options.error_test = true;

        let proc_man = new ProcMan(proc_man_options);

        let thrown = false;

        try{
            await proc_man.reserve_name('no-one', 'file-name');
        }
        catch(err)
        {
            thrown = true;
        }

        expect(thrown).to.be.true;
        await proc_man.queue_job('no-one');

    });
       
    describe('Fs StatMan - opflow', () => {
    
        proc_man_options.processor_use = '../../src/flows/processor.js';
        proc_man_options.status_man_use = '../../src/processor/statmanfs.js';
           
        test_proc_man('opflow-dir', proc_man_options);
 
    });

    
});
